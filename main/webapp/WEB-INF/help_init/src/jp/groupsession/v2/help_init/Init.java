package jp.groupsession.v2.help_init;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;

import jp.co.sjts.util.io.IOTools;
import jp.co.sjts.util.io.IOToolsException;
import jp.co.sjts.util.lucene.LuceneUtil;
import jp.groupsession.v2.cmn.config.Plugin;
import jp.groupsession.v2.cmn.config.PluginConfig;
import jp.groupsession.v2.cmn.config.PluginDigester;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * <br>[機  能] GroupSession Help Index作成バッチ
 * <br>[解  説] 引数でアプリケーションルートパスを渡す。
 * <br>[備  考]
 *
 * @author JTS
 */
public class Init {

    /** Logging インスタンス */
    private static Log log__ = LogFactory.getLog(Init.class);

    /** プラグイン設定ファイル名 */
    private static final String PLUGIN_CONFIG_FILENAME = "plugin.xml";

    /** アプリケーションルート */
    private String rootPath__ = null;
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
            log__.info("アプリケーションルートパスを指定してください。");
            log__.info("Index作成処理を中止します。");
            return;
        }

        //Gsession2ルートディレクトリ
        String v2appRoot = IOTools.replaceSlashFileSep(IOTools.setEndPathChar(args[0]));
        File filePath = new File(v2appRoot);

        System.out.println("アプリケーションルートパス :" + filePath.getCanonicalPath());
        log__.info("Version2 ルートディレクトリ = " + filePath.getCanonicalPath());

        //コンバート実行
        Init init = new Init();
        log__.debug("-- Indexの作成開始 --");
        try {
            init.__setRealPath(filePath.getCanonicalPath());
            init.__initPluginConfig();
            log__.info("Indexの作成が正常に完了しました。");

        } catch (Throwable e) {
            log__.error("エラーが発生しました。\r\n原因: ", e);
        }
        log__.debug("-- help_init(create Index)終了 --");
    }

    /**
     * <br>[機  能] Plugin設定ファイルの読込
     * <br>[解  説]
     * <br>[備  考]
     * @return プラグイン情報
     * @throws ServletException Plugin設定ファイルの読込に失敗
     */
    private PluginConfig __initPluginConfig() throws ServletException {

        PluginConfig pluginConfig = new PluginConfig();
        //pluginの設定ファイルを取得する
        List < String > pconfigs = __getPluginConfigPath();

        String path = "";
        try {
            List<File> helpDirList = new ArrayList<File>();

            //各pluginの設定をロード
            for (String pconfig : pconfigs) {
                path = IOTools.replaceSlashFileSep(pconfig);

                Plugin plugin = PluginDigester.createPluginConfig(path);
                log__.debug("---- plugin ID = " + plugin.getId());
                pluginConfig.addPlugin(plugin);

                //各pluginのヘルプのディレクトリを取得
                helpDirList.add(__createPluginIndexDir(plugin.getId()));
            }
            __execIndexed(helpDirList);

        } catch (Exception e) {
            log__.error(PLUGIN_CONFIG_FILENAME + "の読込に失敗: ファイル名"
                    + path, e);
            throw new ServletException(e);
        }

        return pluginConfig;
    }

    /**
     * <br>[機  能] 各プラグインのヘルプLuceneIndexを生成する。
     * <br>[解  説]
     * <br>[備  考]
     * @param pluginId プラグインID
     * @return File ヘルプパス
     */
    private File __createPluginIndexDir(String pluginId) {

        String rpath = __getRealPath();
        rpath = IOTools.setEndPathChar(rpath);

        //プラグインヘルプディレクトリ
        String helpHtmlDir =
            rpath
            + pluginId
            + File.separator
            + "help"
            + File.separator;

        return new File(helpHtmlDir);
    }

    /**
     * <br>[機  能] プラグインディレクトリに存在するPlugin設定ファイルを返す。
     * <br>[解  説]
     * <br>[備  考]
     * @return パス格納リスト
     */
    private List <String> __getPluginConfigPath() {
        ArrayList < String > ret = new ArrayList<String>();
        String rpath = __getRealPath();
        rpath = IOTools.setEndPathChar(rpath);
        // プラグインディレクトリのパス
        String pluginPath = rpath + "WEB-INF" + File.separator + "plugin";
        List < File > dirFiles = IOTools.getDirs(pluginPath);
        Iterator < File > it = dirFiles.iterator();
        while (it.hasNext()) {
            File dir = it.next();
            String dirPath = dir.getAbsolutePath();
            String configPath = dirPath + File.separator
                    + PLUGIN_CONFIG_FILENAME;
            try {
                if (IOTools.isFileCheck(dirPath, PLUGIN_CONFIG_FILENAME,
                        false)) {
                    ret.add(configPath);
                }
            } catch (IOToolsException e) {
                log__.error(PLUGIN_CONFIG_FILENAME + "の読込に失敗: ファイル名"
                        + configPath, e);
            }
        }
        return ret;
    }

    /**
     * <br>[機  能] 各プラグインのヘルプLuceneIndexを生成する。
     * <br>[解  説]
     * <br>[備  考]
     * @param helpDirs ヘルプDirs
     * @throws FileNotFoundException ファイル非存在例外
     * @throws IOException 入出力時例外
     */
    private void __execIndexed(List<File> helpDirs)
        throws FileNotFoundException, IOException {
        String rpath = __getRealPath();
        rpath = IOTools.setEndPathChar(rpath);

            LuceneUtil lUtil = new LuceneUtil(helpDirs);
            lUtil.addIndexFromDirs(rpath);

    }

    /**
     * <br>[機  能] アプリケーションパスを設定します。
     * <br>[解  説]
     * <br>[備  考]
     * @param rootPath アプリケーションルートパス
     */
    private void __setRealPath(String rootPath) {
        rootPath__ = rootPath;
    }

    /**
     * <br>[機  能] アプリケーションパスを取得します。
     * <br>[解  説]
     * <br>[備  考]
     * @return アプリケーションルートパス
     */
    private String __getRealPath() {
        return rootPath__;
    }
}
