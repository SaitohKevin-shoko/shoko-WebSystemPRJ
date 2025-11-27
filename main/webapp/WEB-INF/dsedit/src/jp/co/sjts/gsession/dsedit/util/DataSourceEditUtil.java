package jp.co.sjts.gsession.dsedit.util;

import java.io.IOException;

import jp.co.sjts.util.io.IOTools;
import jp.co.sjts.util.jdbc.DataSourceModel;
import jp.groupsession.v2.cmn.DBUtilFactory;
import jp.groupsession.v2.cmn.GSConst;
import jp.groupsession.v2.cmn.IDbUtil;
import jp.groupsession.v2.cmn.jdbc.GsDataSourceFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.oro.text.perl.Perl5Util;
import org.xml.sax.SAXException;

/**
 * <br>[機  能] dataSource.xml編集時に使用するユーティリティ
 * <br>[解  説]
 * <br>[備  考]
 *
 * @author JTS
 */
public class DataSourceEditUtil {

    /** Logging インスタンス */
    private static Log log__ = LogFactory.getLog(DataSourceEditUtil.class);

    /**
     * <br>[機 能] 半角英数字かどうかチェックする。
     * <br>[解 説]
     * <br>[備 考]
     * @param input 対象となる文字列
     * @return true:半角英数字である false:半角英数字ではない
     */
    public static boolean isAlphaNum(String input) {
        Perl5Util util = new Perl5Util();
        if (util.match("/^[A-Za-z0-9]+$/", input)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * <br>[機  能] 現在登録されているDBユーザと同じか判定する。
     * <br>[解  説]
     * <br>[備  考]
     * @param buf 新ユーザID
     * @param appRoot アプリケーションRootPath
     * @return boolean true:同じ false:違う
     * @throws IOException IOエラー
     * @throws SAXException XML読み込みエラー
     */
    public static boolean isUserIdNotChange(String buf, String appRoot)
    throws IOException, SAXException {
        IDbUtil dbUtil = DBUtilFactory.getInstance();
        //変更前XMLを取得
        String prefix = IOTools.setEndPathChar(appRoot);
        String dsPath = IOTools.replaceSlashFileSep(prefix
                + "/WEB-INF/conf/dataSource.xml");

        DataSourceModel model = GsDataSourceFactory.createDataSourceModel(
                GSConst.DATASOURCE_KEY, dsPath, dbUtil, appRoot);
        log__.debug("現設定値==>" + model.getUser());
        log__.debug("入力値==>" + buf);
        if (model.getUser().equals(buf)) {
            return true;
        } else {
            return false;
        }
    }
}
