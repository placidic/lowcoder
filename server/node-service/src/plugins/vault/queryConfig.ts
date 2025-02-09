import { ActionParamConfig, Config, ConfigToType, QueryConfig } from "lowcoder-sdk/dataSource";
import { I18nTranslator } from "./i18n";

function getQueryConfig(i18n: I18nTranslator, version: string) {
  const secretsActionParam = {
    key: "secretPath",
    type: "textInput",
    label: i18n.trans("secretPath.label"),
    placeholder: i18n.trans("secretPath.placeholder")
  } as const;

  const dataParam = {
    key: "data",
    type: "textarea",
    label: i18n.trans("data.label"),
    placeholder: i18n.trans("data.placeholder")
  } as const;


  

  const queryConfig = {
    type: "query",
    label: i18n.trans("actions"),
    actions: [
      {
        actionName: "listObjects",
        label: i18n.trans("actionName.listObjects"),
        params: [
          secretsActionParam,
          {
            key: "prefix",
            type: "textInput",
            label: i18n.trans("prefix"),
          },
          {
            key: "delimiter",
            type: "textInput",
            label: i18n.trans("delimiter"),
          },
          {
            key: "limit",
            type: "numberInput",
            defaultValue: 10,
            label: i18n.trans("limit"),
          },
          returnSignedUrlParam,
        ],
      },
      {
        actionName: "readSecret",
        label: i18n.trans("actionName.readSecret"),
        params: [
          secretsActionParam,
          {
            key: "fileName",
            type: "textInput",
            label: i18n.trans("fileName"),
          },
          {
            key: "encoding",
            type: "select",
            label: i18n.trans("dataType"),
            options: [
              { label: "Base64", value: "base64" },
              { label: "Text", value: "utf8" },
            ],
          },
        ],
      },
      {
        actionName: "writeSecret",
        label: i18n.trans("actionName.writeSecret"),
        params: [
          bucketActionParam,
          {
            key: "fileName",
            type: "textInput",
            label: i18n.trans("fileName"),
          },
          {
            key: "encoding",
            type: "select",
            label: i18n.trans("dataType"),
            options: [
              { label: "Base64", value: "base64" },
              { label: "Text", value: "utf8" },
            ],
          },
          {
            key: "data",
            type: "textInput",
            label: i18n.trans("data"),
          },
          {
            key: "contentType",
            type: "textInput",
            label: "Content-Type",
            placeholder: "image/png",
          },
          returnSignedUrlParam,
        ],
      },
      {
        actionName: "deleteSecret",
        label: i18n.trans("actionName.deleteSecret"),
        params: [
          bucketActionParam,
          {
            key: "fileName",
            type: "textInput",
            label: i18n.trans("fileName"),
          },
        ],
      },
    ],
  } as const;
  return queryConfig;
}

export type ActionDataType = ConfigToType<ReturnType<typeof getQueryConfig>>;

export default getQueryConfig;
