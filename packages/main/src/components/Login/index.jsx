import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
  DesktopOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import { Button, Divider, message, Space, Tabs, Tooltip } from "antd";
import { useState, useRef } from "react";
import useLogin from "../../hooks/useLogin";
import ScanLogin from "./components/ScanLogin";

const defaultSettings = {
  logo: "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
  title: "Lg-Admin-base",
  subTitle: "菱歌科技后台管理基础模板",
  fixedHeader: true,
  layout: "mix",
  backgroundImageUrl:
    "https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png",
};

/**
 * qwe
 * @params {String} loginUrl
 * @params {Function} onSubmit 登录回调函数
 * */
export default ({
  loginUrl,
  backgroundImageUrl,
  logo,
  title,
  subTitle,
  onSubmit,
  wwConfig,
}) => {
  const [loginType, setLoginType] = useState("account");
  const { handleLogin, isLoading } = useLogin();
  const formRef = useRef();

  // 切换二维码
  const changeQRCodeSubmit = (type) => {
    if (type === "qrcode") {
      return {
        render: () => <ScanLogin config={wwConfig} />,
      };
    }
    return {
      submitButtonProps: {
        loading: isLoading,
      },
    };
  };

  return (
    <div className='w-screen h-screen overflow-hidden relative'>
      <LoginFormPage
        formRef={formRef}
        backgroundImageUrl={
          backgroundImageUrl || defaultSettings.backgroundImageUrl
        }
        logo={logo || defaultSettings.logo}
        title={title || defaultSettings.title}
        subTitle={subTitle || defaultSettings.subTitle}
        activityConfig={false}
        submitter={changeQRCodeSubmit(loginType)}
        onFinish={async (values) => {
          const res = await handleLogin(loginUrl, values, loginType);
          onSubmit(res);
        }}
      >
        {loginType !== "qrcode" && (
          <>
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey)}
            >
              <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
              <Tabs.TabPane key={"phone"} tab={"手机号登录"} />
            </Tabs>
            {loginType === "account" && (
              <>
                <ProFormText
                  name='account'
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined className={"prefixIcon"} />,
                  }}
                  placeholder={"账号: admin"}
                  rules={[
                    {
                      required: true,
                      message: "请输入账号!",
                    },
                  ]}
                />
                <ProFormText.Password
                  name='password'
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined className={"prefixIcon"} />,
                  }}
                  placeholder={"密码: 123"}
                  rules={[
                    {
                      required: true,
                      message: "请输入密码！",
                    },
                  ]}
                />
              </>
            )}
            {loginType === "phone" && (
              <>
                <ProFormText
                  fieldProps={{
                    size: "large",
                    prefix: <MobileOutlined className={"prefixIcon"} />,
                  }}
                  name='phoneNumber'
                  placeholder={"手机号"}
                  rules={[
                    {
                      required: true,
                      message: "请输入手机号！",
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: "手机号格式错误！",
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined className={"prefixIcon"} />,
                  }}
                  captchaProps={{
                    size: "large",
                  }}
                  placeholder={"请输入验证码"}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${"获取验证码"}`;
                    }
                    return "获取验证码";
                  }}
                  name='captcha'
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码！",
                    },
                  ]}
                  onGetCaptcha={async () => {
                    message.success("获取验证码成功！验证码为：1234");
                  }}
                />
              </>
            )}
          </>
        )}
      </LoginFormPage>
      <div className='absolute top-0 right-0'>
        <div className='w-[80px] h-[80px] bg-blue-600 flex items-start justify-end '>
          <div className='text-5xl mt-2 mr-2 text-white'>
            {loginType !== "qrcode" ? <QrcodeOutlined /> : <DesktopOutlined />}
          </div>
        </div>
        <Tooltip
          placement='left'
          title={loginType !== "qrcode" ? "扫码登录" : "账号密码登录"}
        >
          <div
            onClick={() => {
              setLoginType(loginType !== "qrcode" ? "qrcode" : "account");
            }}
            className='
          login-triangle'
          />
        </Tooltip>
      </div>
    </div>
  );
};
