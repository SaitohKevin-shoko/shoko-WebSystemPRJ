package jp.co.sjts.gsession.dsedit;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import jp.co.sjts.gsession.dsedit.util.DataSourceEditUtil;
import jp.co.sjts.util.Encoding;
import jp.co.sjts.util.io.IOTools;
import jp.co.sjts.util.io.IOToolsException;
import jp.co.sjts.util.jdbc.DataSourceModel;
import jp.co.sjts.util.jdbc.JDBCUtil;
import jp.groupsession.v2.cmn.DBUtilFactory;
import jp.groupsession.v2.cmn.GSConst;
import jp.groupsession.v2.cmn.IDbUtil;
import jp.groupsession.v2.cmn.dao.AlterDao;
import jp.groupsession.v2.cmn.jdbc.GsDataSourceFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;


/**
 * <br>[機  能] dataSource.xmlのユーザ・パスワード部分を編集する
 * <br>[解  説]
 * <br>[備  考]
 *
 * @author JTS
 */
public class DataSourceEdit {

    /** Logging インスタンス */
    private static Log log__ = LogFactory.getLog(DataSourceEdit.class);
    /** デフォルトユーザ名 */
    private static final String DF_USER = "gsession";
    /** デフォルトパスワード */
    private static final String DF_PASS = "gsession";
    /** APP_ROOTからのTEMPディレクトリ */
    private static final String TEMP_DIR = "tmp/";
    /** APP_ROOTからのXSLファイルPATH */
    private static final String XSL_FILE = "WEB-INF/dsedit/conf/style.xsl";
    /** APP_ROOTからのdataSource.xmlPATH */
    private static final String XML_FILE = "WEB-INF/conf/dataSource.xml";
    /** ファイル名 */
    private static final String FILE_NAME = "dataSource.xml";
    /** 要素名 */
    private static final String[] COLUMNS = {"id", "driverClassName",
        "username", "password", "defaultAutoCommit",
        "defaultReadOnly", "maxTotal", "maxIdle", "maxWait", "validationQuery",
        "removeAbandonedOnBorrow", "removeAbandonedTimeout", "logAbandoned"};

    /** 要素内容1 */
    private static final String[] COLUMNS_VAL1 = {"GsDataSource", "org.h2.Driver",
        "app", "pass", "false",
        "false", "40", "10", "3000", "",
        "true", "600", "false"};

    /** 要素内容2 */
    private static final String[] COLUMNS_VAL2 = {"GsDataSourceNum", "org.h2.Driver",
        "app", "pass", "false",
        "false", "1", "1", "3000", "",
        "false", "", ""};

    /** ユーザ名 */
    private static String userName__ = null;
    /** パスワード */
    private static String userPass__ = null;


    /**
     * <br>[機  能] メイン
     * <br>[解  説]
     * <br>[備  考]
     * @param args 引数
     * @throws Exception 実行例外
     */
    public static void main(String[] args) throws Exception {
        if (args.length <= 0) {
            //
            log__.warn("コンバートオプションを指定してください。");
            log__.warn("コンバートを中止します。");
            return;
        }

        //V2ルートディレクトリ
        String v2appRoot = IOTools.setEndPathChar(args[0]);
        String tmpPath = IOTools.setEndPathChar(v2appRoot + "tmp");
        if (IOTools.isDirCheck(tmpPath, true)) {
            File appRootDir = new File(v2appRoot);
            log__.info("Version2 ルートディレクトリ = " + appRootDir.getCanonicalPath());
        } else {
            //作成できない
            throw new IOToolsException("作業フォルダを作成できません。");
        }
        //変更先DBディレクトリ
        String dbDir = IOTools.setEndPathChar(GsDataSourceFactory.getDbDir(v2appRoot));
        Connection con = getConnection(v2appRoot, dbDir);
        //dataSource.xmlファイルを取得
        File conf = __getDataSourceConf(v2appRoot);
        if (conf == null) {
            log__.info("dataSource.xmlが存在しません。");
        }

        //変更後のユーザ名を取得
        getUserName(v2appRoot);
        if (userName__ == null) {
            //Ctrl + C で強制終了した場合
            return;
        }
        //変更後のパスワードを取得
        getUserPass();
        if (userName__ == null) {
            //Ctrl + C で強制終了した場合
            return;
        }

        //編集処理
        updateDataSourceXmlForH2(v2appRoot, con);

    }

    /**
     * <br>[機  能] dataSource.xmlを取得
     * <br>[解  説]
     * <br>[備  考]
     * @param appRoot アプリケーションRootパス(相対パス)
     * @return デフォルトデータディレクトリ
     */
    private static File __getDataSourceConf(String appRoot) {
        File dataDir = new File(appRoot + "conf/dataSource.xml");
        return dataDir;
    }

    /**
     * <br>[機  能] 変更後のユーザ名を取得
     * <br>[解  説]
     * <br>[備  考]
     * @param appRoot ルートPATH
     * @throws IOException IO例外
     * @throws SAXException XML読み込み例外
     */
    private static void getUserName(String appRoot) throws IOException, SAXException {

        BufferedReader reader =
            new BufferedReader(new InputStreamReader(System.in));

        //デフォルト値作成
        System.out.println("DBへ接続するユーザ名を指定してください。");
        System.out.print("[" + DF_USER + "]:"); // デフォルト

        String buf = reader.readLine();
        buf = buf.trim();

        //デフォルト設定
        if (buf == null || buf.length() <= 0) {
            buf = DF_USER;
        }

        //20文字以上はエラー
        if (buf.length() > 20) {
            System.out.println("20文字以内で入力してください。");
            getUserName(appRoot);
            return;
        }

        //半角英数以外はエラー
        if (!DataSourceEditUtil.isAlphaNum(buf)) {
            System.out.println("半角英数字で入力してください。");
            getUserName(appRoot);
            return;
        }
        System.out.println();
        //OK
        userName__ = buf;
    }

    /**
     * <br>[機  能] 変更後のパスワードを取得
     * <br>[解  説]
     * <br>[備  考]
     * @throws IOException IO例外
     */
    private static void getUserPass() throws IOException {

        BufferedReader reader =
            new BufferedReader(new InputStreamReader(System.in));

        //デフォルト値作成
        System.out.println("パスワードを指定してください。");
        System.out.print("[" + DF_PASS + "]:"); // デフォルト

        String buf = reader.readLine();
        //デフォルト設定
        if (buf == null || buf.length() <= 0) {
            System.out.println();
            userPass__ = DF_PASS;
            return;
        }

        //20文字以上はエラー
        if (buf.length() > 20) {
            System.out.println("20文字以内で入力してください。");
            getUserPass();
            return;
        }

        //半角英数以外はエラー
        if (!DataSourceEditUtil.isAlphaNum(buf)) {
            System.out.println("半角英数字で入力してください。");
            getUserPass();
            return;
        }

        //OK
        userPass__ = buf;
    }

    /**
     * <br>[機  能] dataSource.xmlを編集
     * <br>[解  説]
     * <br>[備  考]
     * @param appRoot アプリケーションRootパス(相対パス)
     */
    public static void updateDataSourceXmlForDerby(String appRoot) {
        log__.debug("-- dataSource.xmlを編集開始 --");
        try {
            //XMLファイルをTEMPに生成
            createXml(userName__, userPass__, appRoot);

            //TEMPからconf/db/dataSource.xmlへ上書きコピー
            overWriteXml(appRoot);
            log__.debug("正常にユーザ・パスワードの変更が終了しました。");
            System.out.println("正常にユーザ・パスワードの変更が終了しました。");
        } catch (Exception e) {
            log__.error("エラーが発生しました。\r\n原因: ", e);
        }
        log__.debug("-- dataSource.xmlを編集終了 --");
    }

    /**
     * <br>[機  能] dataSource.xmlを編集
     * <br>[解  説]
     * <br>[備  考]
     * @param appRoot アプリケーションRootパス(相対パス)
     * @param con コネクション
     * @throws SQLException ALTER USERに失敗
     */
    public static void updateDataSourceXmlForH2(String appRoot, Connection con)
    throws SQLException {
        log__.debug("-- dataSource.xmlを編集開始 --");

        boolean commit = false;
        try {

            IDbUtil dbUtil = DBUtilFactory.getInstance();
            //変更前XMLを取得
            String prefix = IOTools.setEndPathChar(appRoot);
            String dsPath = IOTools.replaceSlashFileSep(prefix
                    + "/WEB-INF/conf/dataSource.xml");
            log__.debug("appRoot==>" + prefix);
            log__.debug("dsPath==>" + dsPath);

            DataSourceModel model = GsDataSourceFactory.createDataSourceModel(
                    GSConst.DATASOURCE_KEY, dsPath, dbUtil, appRoot);

            //userId:passwordを変更
            AlterDao alDao = new AlterDao(con);
            //既存ユーザと同じIDは更新しない
            if (!DataSourceEditUtil.isUserIdNotChange(userName__, appRoot)) {
                alDao.changeUser(model.getUser(), userName__);
            }
            alDao.changePassword(userName__, userPass__);
            //XMLファイルをTEMPに生成
            createXml(userName__, userPass__, appRoot);

            //TEMPからconf/db/dataSource.xmlへ上書きコピー
            overWriteXml(appRoot);
            log__.debug("正常にユーザ・パスワードの変更が終了しました。");
            System.out.println("正常にユーザ・パスワードの変更が終了しました。");
            commit = true;
        } catch (Exception e) {
            log__.error("エラーが発生しました。\r\n原因: ", e);
        } finally {
            if (commit) {
                con.commit();
            } else {
                con.rollback();
            }
            JDBCUtil.closeConnection(con);
        }
        log__.debug("-- dataSource.xmlを編集終了 --");
    }

    /**
     * <br>[機  能] tempディレクトリにdataSource.xmlファイルを生成する
     * <br>[解  説]
     * <br>[備  考]
     * @param name ユーザ名
     * @param pass パスワード
     * @param appRoot アプリケーションRootパス(相対パス)
     * @throws Exception 出力例外
     */
    public static void createXml(String name, String pass, String appRoot) throws Exception  {

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        DOMImplementation domImpl = builder.getDOMImplementation();
        //Root
        Document document = domImpl.createDocument("", "DataSourceSetting", null);
        Element root = document.getDocumentElement();
        //通常使用するデータソース設定
        Element datasource = document.createElement("datasource");
        for (int i = 0; i < COLUMNS.length; i++) {
            Element element = document.createElement(COLUMNS[i]);
            if (COLUMNS[i].equals(COLUMNS[2])) {
                element.appendChild(document.createTextNode(name));
            } else if (COLUMNS[i].equals(COLUMNS[3])) {
                element.appendChild(document.createTextNode(pass));
            } else {
                element.appendChild(document.createTextNode(COLUMNS_VAL1[i]));
            }
            datasource.appendChild(element);
        }
        root.appendChild(datasource);

        //採番用データソース
        Element datasourceNm = document.createElement("datasource");
        for (int i = 0; i < COLUMNS.length; i++) {
            Element elementNm = document.createElement(COLUMNS[i]);
            if (COLUMNS[i].equals(COLUMNS[2])) {
                elementNm.appendChild(document.createTextNode(name));
            } else if (COLUMNS[i].equals(COLUMNS[3])) {
                elementNm.appendChild(document.createTextNode(pass));
            } else {
                elementNm.appendChild(document.createTextNode(COLUMNS_VAL2[i]));
            }
            datasourceNm.appendChild(elementNm);
        }
        root.appendChild(datasourceNm);

        //インデントをつけるスタイルシート
        File xsl = new File(appRoot + XSL_FILE);
        StreamSource xslSource = new StreamSource(xsl);
        TransformerFactory transFactory = TransformerFactory.newInstance();
        Transformer transformer = transFactory.newTransformer(xslSource);
        //出力文字コード
        transformer.setOutputProperty(OutputKeys.ENCODING, Encoding.UTF_8);
        DOMSource source = new DOMSource(document);
        //tmpディレクトリに新規ファイル生成
        File newXML = new File(appRoot + TEMP_DIR + FILE_NAME);
        FileOutputStream fos = new FileOutputStream(newXML);
        OutputStreamWriter osw = new OutputStreamWriter(fos, Encoding.UTF_8);
        StreamResult result = new StreamResult(osw);
        transformer.transform(source, result);
        //ストリームクローズ
        osw.close();
        fos.close();
    }

    /**
     * <br>[機  能] dataSource.xmlを上書きします
     * <br>[解  説] conf/db/dataSource.xmlをバックアップ
     * <br>[備  考]
     * @param appRoot アプリケーションRootパス(相対パス)
     * @throws IOException バックアップ時例外
     */
    public static void overWriteXml(String appRoot) throws IOException {

        //上書き前にバックアップ
        backupXml(appRoot);
        //tmpからwar/WEB-INF/conf/dataSource.xmlへコピー
        IOTools.copyFile(
                new File(appRoot + TEMP_DIR + FILE_NAME), Encoding.UTF_8,
                new File(appRoot + XML_FILE), Encoding.UTF_8);
    }

    /**
     * <br>[機  能] dataSource.xmlのバックアップを行います。
     * <br>[解  説]
     * <br>[備  考]
     * @param appRoot アプリケーションRootパス(相対パス)
     * @throws IOException バックアップ時例外
     */
    public static void backupXml(String appRoot) throws IOException {
        //war/WEB-INF/conf/dataSource.xmlからtmp/dataSource.xml_backupへコピー
        IOTools.copyFile(
                new File(appRoot + XML_FILE), Encoding.UTF_8,
                new File(appRoot + TEMP_DIR + FILE_NAME + "_backup"), Encoding.UTF_8);
    }

    /**
     * <br>[機  能] DBコネクションを取得する。
     * <br>[解  説]
     * <br>[備  考]
     * @param appRoot ホームディレクトリ(例:c:\tomcat\webapps\gsession)
     * @param dbRoot DBディレクトリ
     * @return DBコネクション
     */
    public static Connection getConnection(String appRoot, String dbRoot) {

        Connection con = null;
        //String url = "jdbc:derby:" + gs2dir + "gs2db;create=false";
        String url = "jdbc:h2:" + dbRoot + "/gs2db/gs2db";
        log__.info("URL = " + url);
        // 組み込み環境
        try {
            //変更前XMLを取得
            DataSourceModel model = getDataSourceModel(appRoot);

            Class.forName("org.h2.Driver");
            /* データベースが存在しない時は作成 */
            con = DriverManager.getConnection(url, model.getUser(), model.getPass());
            /* システム情報 */
            System.out.println(con.getMetaData().getURL());
            con.setAutoCommit(false);
        } catch (SQLException e1) {
            e1.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        return con;
    }

    /**
     * <br>[機  能] 現データソース設定ファイルの内容をオブジェクトとして取得します
     * <br>[解  説]
     * <br>[備  考]
     * @param appRoot アプリケーションRootPath
     * @return DataSourceModel
     * @throws IOException IO例外
     * @throws SAXException XML読み込み例外
     */
    public static DataSourceModel getDataSourceModel(String appRoot)
    throws IOException, SAXException {
        IDbUtil dbUtil = DBUtilFactory.getInstance();
        //変更前XMLを取得
        String prefix = IOTools.setEndPathChar(appRoot);
        String dsPath = IOTools.replaceSlashFileSep(prefix
                + "/WEB-INF/conf/dataSource.xml");
        DataSourceModel model = GsDataSourceFactory.createDataSourceModel(
                GSConst.DATASOURCE_KEY, dsPath, dbUtil, appRoot);
        return model;
    }
}
