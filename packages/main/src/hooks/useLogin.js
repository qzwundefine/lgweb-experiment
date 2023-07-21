import { useState } from "react";
import { message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocalStorageState } from "ahooks";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorageState("userInfo");
  // const navigate = useNavigate();

  function mockUserInfo(params, type) {
    switch (type) {
      case "phone": {
        const { captcha, phoneNumber } = params;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (phoneNumber === "15220699488" && captcha === "1234") {
              resolve({
                id: 1,
                userName: "admin",
                sysRole: "admin",
              });
            } else {
              reject(new Error("验证码错误！"));
            }
          }, 2000);
        });
      }
      default: {
        const { account, password } = params;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (account === "admin" && password === "123") {
              resolve({
                id: 1,
                userName: "admin",
                sysRole: "admin",
              });
            } else {
              reject(new Error("登录账号或密码错误！"));
            }
          }, 2000);
        });
      }
    }
  }

  //   登录函数
  async function handleLogin(loginUrl, params, type) {
    if (!loginUrl) {
      message.error("请配置登录请求地址");
      return;
    }
    setIsLoading(true);
    try {
      const res = await mockUserInfo(params, type);
      setUserInfo(res);
      notification.success({
        message: "欢迎回来 ",
        description: "欢迎使用菱歌科技微代码平台！",
      });
      setIsLoading(false);
      // navigate("/");
    } catch (e) {
      message.error(e.message);
      setIsLoading(false);
    }
  }

  //   退出登录函数
  async function handleLogout() {
    setUserInfo(undefined);
    // navigate("/login");
  }

  return {
    isLoading,
    handleLogin,
    handleLogout,
  };
};
