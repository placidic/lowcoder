import { S3ServiceException } from "@aws-sdk/client-s3";
import { ServiceError } from "../../common/error";
import _ from "lodash";
import { DataSourcePluginFactory, PluginContext } from "lowcoder-sdk/dataSource";
import { ActionDataType } from "./queryConfig";
import { DataSourceDataType } from "./dataSourceConfig";
import run, { validateDataSourceConfig } from "./run";
import getI18nTranslator from "./i18n";
import getDataSourceConfig from "./dataSourceConfig";
import getQueryConfig from "./queryConfig";
import { dirToSpecList } from "../../common/util";
import path from "path";
import vault from "node-vault";

const authMethods = { 
  "LDAP": "ldap",
  "Token": "token",
  "App Role": "appRole",
  "Userpass": "userpass"
};

const specs = {
  "authMethods": authMethods,
};

const vaultPlugin: DataSourcePluginFactory = (context: PluginContext) => {
  const i18n = getI18nTranslator(context.languages);
  return {
    id: "vault",
    name: i18n.trans("name"),
    icon: "vault.svg",
    description: i18n.trans("description"),
    category: "Assets",
    dataSourceConfig: getDataSourceConfig(i18n, specs),
    queryConfig: async (data) => {
      return getQueryConfig(i18n, data.specVersion as keyof typeof specs);
    },

    validateDataSourceConfig: async (dataSourceConfig: DataSourceDataType) => {
      return validateDataSourceConfig(dataSourceConfig);
    },

    run: async (queryConfig: QueryConfigType, dataSourceConfig: DataSourceDataType) => {
      const { authMethod, ...authParams } = dataSourceConfig.auth;
      const vaultClient = vault({
        endpoint: dataSourceConfig.endpoint,
        token: authParams.token,
      });

      switch (queryConfig.action) {
        case "read":
          return vaultClient.read(queryConfig.secretPath);
        case "write":
          return vaultClient.write(queryConfig.secretPath, queryConfig.data);
        case "delete":
          return vaultClient.delete(queryConfig.secretPath);
        case "list":
          return vaultClient.list(queryConfig.secretPath);
        default:
          throw new Error("Unsupported action");
      }
    }
  };
};

export default vaultPlugin;