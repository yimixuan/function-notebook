```
package com.kunpeng.zzr.controller.activity;

import com.gexin.fastjson.JSONObject;
import com.kunpeng.zzr.cache.Cache;
import com.kunpeng.zzr.encrypt.SHA1;
import com.kunpeng.zzr.entity.UserMain;
import com.kunpeng.zzr.entity.WxUserGame;
import com.kunpeng.zzr.service.activity.IWXUserGameHandler;
import com.kunpeng.zzr.service.user.IUserMainHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

/**
 * Desc：年报微信授权
 * User：YangYunLong
 * Date：2017-12-27
 * Time：10:47
 */
@Controller
@RequestMapping(value = "annals")
public class WeChatAnnalsControlle {
    
    Logger logger = LoggerFactory.getLogger(WeChatAnnalsControlle.class);
    
    @Resource
    IWXUserGameHandler wXUserGameHandler;
    @Resource
    IUserMainHandler userMainHandler;
    @Resource
    Cache cache;
    
    /*******************测试start***************************/
    private final static String APPID = "wxbb93620e7a886a5f";
    private final static String SECRET = "4fd32e05fcecfe42732db9c9ee305942";
    /*******************测试start***************************/

    /*******************正式start***************************/
//    private final static String APPID = "wx91de33454c7f56f2"; 
//    private final static String SECRET = "c89b219a3fed4db38217523c4e57a5d8";
    /*******************正式end***************************/
    
    //获取code信息URL
    private final static String GET_WEIXIN_CODE_URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%1$s&redirect_uri=%2$s&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

    //授权时通过appid、secret、code获取Token信息URL
    private final static String GET_ACCESS_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%1$s&secret=%2$s&code=%3$s&grant_type=authorization_code";

    //获取微信用户信息URL
    private final static String GET_WX_USER_INFO_URL = "https://api.weixin.qq.com/sns/userinfo?access_token=%1$s&openid=%2$s&lang=zh_CN";

    //单独获取access_token通过appid、secret
    private final static String GET_ACCESS_TOKEN ="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%1$s&secret=%2$s";

    //获取jsapi_ticket签名需要
    public static final String GET_JSAPI_TICKET_URL = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%1$s&type=jsapi";

    //	private final static String ZZR_WAP_URL = "https://www.zhongzairong.cn";//正式
    private final static String ZZR_WAP_URL = "http://accounttitle.imwork.net";//测试	
    
    //公众号验证token密钥
    private final static String TOKEN = "rC2gfe8aY5EAZy";
    
    /**
     * Desc：第一步：用户同意授权，获取code
     * User：YangYunLong
     * Date：2017-12-27 11:05
     * @return String
     */
    @RequestMapping(value="oauth")
    public String oauth(HttpServletRequest request, HttpServletResponse response) {
        logger.info("第一步：用户同意授权，获取code");
        //跳转地址url
        String url = ZZR_WAP_URL+"/annals/getAccessTokenBycode.do";
        //获取code链接
        String codeUrl = String.format(GET_WEIXIN_CODE_URL,APPID, URLEncoder.encode(url));
        logger.info("第一步URL为："+codeUrl);
        return "redirect:"+ codeUrl;
    }

    /**
     * Desc：第二步：通过code换取网页授权access_token
     * User：YangYunLong
     * Date：2017-12-27 11:19
     * @return String
     */
    @RequestMapping(value="getAccessTokenBycode")
    public String getAccessTokenBycode(HttpServletRequest request, HttpServletResponse response){
        logger.info("第二步：通过code换取网页授权access_token");
        String code = request.getParameter("code");
        logger.info("=========第一步获取code为："+code);
        //获取token和openId链接
        String url = String.format(GET_ACCESS_TOKEN_URL,APPID,SECRET,code);
        logger.info("第二步URL为："+url);
        JSONObject jsonObject = httpGet(url);
        logger.info("=========第二步获取access_token为："+jsonObject.get("access_token")+"，openid为："+jsonObject.get("openid"));
        return "redirect:/annals/getWeChatInfo.do?access_token="+jsonObject.get("access_token")+"&openid="+jsonObject.get("openid");
    }

    /**
     * Desc：第三步：拉取用户信息
     * User：YangYunLong
     * Date：2017-12-27 11:21
     * @return String
     */
    @RequestMapping(value = "getWeChatInfo.do")
    public String getWeChatInfo(HttpServletRequest request, HttpServletResponse response){
        logger.info("第三步：拉取用户信息");
        String access_token = request.getParameter("access_token");
        String openid = request.getParameter("openid");
        if(StringUtils.isNotBlank(access_token) && StringUtils.isNotBlank(openid)){
            try {
                //根据openId查询是否关联中再融userId信息
                Map<String,Object> wxUserGameMap =  wXUserGameHandler.queryUserMainWX(openid);
                if(wxUserGameMap != null){
                    Object objUserId = wxUserGameMap.get("userId");
                    Integer userId = 0;
                    if(objUserId != null && !objUserId.equals("")){
                        userId  = Integer.parseInt(objUserId.toString());
                        UserMain userMain = userMainHandler.queryUserMainById(userId);
                        request.getSession().setAttribute("userObj", userMain);
                        logger.info("=======openid为："+openid+"与userId："+userMain.getUserId()+"已有关联数据，跳转活动页面=======");
                        return "/activity/annals/annalsData";
                    }else{
                        logger.info("=======openid为："+openid+"已存在未关联userId，跳转登陆页面=======");
                        return "redirect:/annals/toAnnalsLogin.do?openid="+openid;
                    }
                }else{
                    logger.info("=======openid为："+openid+"无绑定数据，开始新增关联数据，跳转登陆页面=======");
                    //获取微信用户信息链接
                    String url = String.format(GET_WX_USER_INFO_URL,access_token,openid);
                    logger.info("第三步URL为："+url);
                    JSONObject jsonObject = httpGet(url);
                    logger.info("第三步获取微信用户信息："+jsonObject);
                    WxUserGame wxUserGame = new WxUserGame();
                    wxUserGame.setOpenid(jsonObject.get("openid")+"");
                    wxUserGame.setOauthtime(new Date());
                    String nickName = new String( jsonObject.getString("nickname").toString().getBytes("ISO-8859-1"),"UTF-8").replaceAll("[\\ue000-\\uefff]", "***");
                    wxUserGame.setWxnickname(nickName);
                    wxUserGame.setWxheadimgurl(jsonObject.get("headimgurl")+"");
                    wxUserGame.setType(7);
                    wxUserGame.setLogflag(0);
                    wXUserGameHandler.addWxUser(wxUserGame);
                    return "redirect:/annals/toAnnalsLogin.do?openid="+openid;
                }           
            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            logger.info("获取微信用户openid为空重新授权获取");
            return "redirect:/annals/oauth.do";
        }
        return null;
    }


    /**
     * Desc：年报分享所需数据
     * User：YangYunLong
     * Date：2018-01-02 16:11
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value="weChatShare.do")
    @ResponseBody
    public String weChatShare(HttpServletRequest request, HttpServletResponse response){

        String shareUrl = request.getParameter("shareUrl");
        long timestamp = new Date().getTime()/1000;
        String nonceStr = UUID.randomUUID().toString();
        String signature = "";
        String access_token = "";
        String jsapi_ticket = "";
        try {
            Object token = cache.getCache("annals_access_token");
            if(token == null){
                String accessTokenUrl = String.format(GET_ACCESS_TOKEN,APPID,SECRET);
                JSONObject jsonObject =httpGet(accessTokenUrl);
                access_token = jsonObject.getString("access_token");
                cache.setCache("annals_access_token", access_token,3600);
            }else{
                access_token = token.toString();
            }

            Object ticket = cache.getCache("annals_jsapi_ticket");
            if(ticket == null){
                String jsapiTicketUrl = String.format(GET_JSAPI_TICKET_URL, access_token);
                JSONObject jsonJsapiTicket  = httpGet(jsapiTicketUrl);
                jsapi_ticket = jsonJsapiTicket.getString("ticket");
                cache.setCache("annals_jsapi_ticket", jsapi_ticket,3600);
            }else{
                jsapi_ticket = ticket.toString();
            }

            nonceStr = nonceStr.substring(0, nonceStr.length()>=32?32:nonceStr.length());

            String string1 = "jsapi_ticket="+jsapi_ticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+shareUrl;
            logger.info("加密前===========>"+string1);
            signature = SHA1.EncoderBySha1(string1);
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("appid", APPID);
            map.put("timestamp", timestamp);
            map.put("nonceStr", nonceStr);
            map.put("signature", signature);
            net.sf.json.JSONObject json = new net.sf.json.JSONObject();
            return json.fromObject(map).toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    /**
     * Desc：httpGet请求
     * User：YangYunLong
     * Date：2017-11-27
     * Time：16:54
     */
    public JSONObject httpGet(String requestURl) {
        HttpClient httpClient = new HttpClient();
        GetMethod getMethod = new GetMethod(requestURl);
        try {
            int status = httpClient.executeMethod(getMethod);
            logger.info("httpGet请求返回status状态：" + status);
            if(status == 200){
                String str = getMethod.getResponseBodyAsString();
                JSONObject obj = JSONObject.parseObject(str);
                logger.info("httpGet请求返回data："+obj);
                return obj;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  null;
    }

    /**
     * Desc：验证token
     * User：YangYunLong
     * Date：2017-12-27 17:15
     * @param request
     * @param response
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */
    @RequestMapping(value="/getToken.do")
    public void getToken(HttpServletRequest request, HttpServletResponse response) throws IOException, NoSuchAlgorithmException {
        String signature = request.getParameter("signature");
        String timestamp = request.getParameter("timestamp");
        String nonce = request.getParameter("nonce");
        String[] arr = new String[] { TOKEN, timestamp, nonce };
        Arrays.sort(arr);
        String str = arr[0] + arr[1] + arr[2];

        MessageDigest crypt = MessageDigest.getInstance("SHA-1");
        crypt.reset();
        crypt.update(str.getBytes("UTF-8"));
        String sha1 = byteToHex(crypt.digest());

        logger.info("signature = " + signature);
        logger.info("timestamp = " + timestamp);
        logger.info("nonce = " + nonce);
        logger.info("sha1 = " + sha1);

        if (signature.equals(sha1)) {
            String echostr = request.getParameter("echostr");
            logger.info("echostr = " + echostr);
            response.getWriter().print(echostr);
        }
    }

    @SuppressWarnings("Duplicates")
    private static String byteToHex(final byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash) {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }
}

```
