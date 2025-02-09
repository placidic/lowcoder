import { ConfigToType } from "lowcoder-sdk/dataSource";
import { I18nTranslator } from "./i18n";
import { specsToOptions } from "../../common/util";

const getDataSourceConfig = (i18n: I18nTranslator, specs: any) => {
  const dataSourceConfig = {
    type: "dataSource",
    params: [
      {
        key: "endpoint",
        label: i18n.trans("endpoint.label"),
        type: "text",
        placeholder: i18n.trans("endpoint.placeholder"),
        rules: [{ required: true, message: i18n.trans("endpoint.requiredMessage") }]
      },
      {
        key: "authMethod",
        label: i18n.trans("authMethod.label"),
        type: "select",
        options: Object.keys(specs.authMethods).map((key) => ({
          label: i18n.trans(`authMethod.options.${key}`),
          value: specs.authMethods[key],
        })),
        rules: [{ required: true, message: i18n.trans("authMethod.requiredMessage") }]
      },
      {
        key: "token",
        label: i18n.trans("token.label"),
        type: "text",
        placeholder: i18n.trans("token.placeholder"),
        required: true,
        show: (config) => config.authMethod === "token",
      },
      {
        key: "username",
        label: i18n.trans("username.label"),
        type: "text",
        placeholder: i18n.trans("username.placeholder"),
        required: true,
        show: (config) => config.authMethod === "userpass",
      },
      {
        key: "password",
        label: i18n.trans("password.label"),
        type: "password",
        placeholder: i18n.trans("password.placeholder"),
        required: true,
        show: (config) => config.authMethod === "userpass",
      },
      {
        key: "roleId",
        label: i18n.trans("roleId.label"),
        type: "text",
        placeholder: i18n.trans("roleId.placeholder"),
        required: true,
        show: (config) => config.authMethod === "appRole",
      }
    ],
} as const;
return dataSourceConfig;
};

export default getDataSourceConfig;

export type DataSourceDataType = ConfigToType<ReturnType<typeof getDataSourceConfig>>;
