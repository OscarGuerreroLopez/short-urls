import { cleanEnv, str, num } from "envalid";

export enum NodeEnvEnum {
  DEVELOPMENT = "development",
  TEST = "test",
  PROD = "prod"
}

const getEnvVars = (): EnvObject => {
  const EnvVars = cleanEnv(process.env, {
    NODE_ENV: str({ choices: Object.values(NodeEnvEnum) }),
    PORT: num(),
    BASEURL: str()
  });

  return EnvVars as EnvObject;
};

export const EnvVars = getEnvVars();
