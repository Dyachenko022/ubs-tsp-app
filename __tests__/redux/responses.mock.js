import { IExecuteRes } from "../../src/redux/document/api";

export const returnDataRes1 = {
  "codeResult": 0,
  "textResult": "",
  "inputFields": [
    {
      "group": "Параметры справки",
      "fields": [
        {
          "sid": "Документ.Источник списания",
          "name": "Счет для справки",
          "inputType": "Account:LOAN;#6",
          "minSize": 1,
          "maxSize": 0,
          "condition": "false"
        },
        {
          "sid": "Язык справки",
          "name": "Язык справки",
          "inputType": "ComboBoxDropDownList",
          "minSize": 0,
          "maxSize": 0
        },
        {
          "sid": "Документ.Тип документа",
          "name": "Документ.Тип документа",
          "inputType": "TextBox",
          "minSize": 0,
          "maxSize": 0,
          "condition": "false"
        },
        {
          "sid": "Документ.Доп. информация",
          "name": "Документ.Доп. информация",
          "inputType": "TextBox",
          "minSize": 0,
          "maxSize": 0,
          "condition": "false"
        }
      ]
    }
  ],
  "listValues": [
    {
      "name": "Язык справки",
      "value": [
        [
          0,
          "На русском"
        ],
        [
          1,
          "На английском"
        ]
      ]
    },
    {
      "name": "Документ.Источник списания",
      "value": [
        [
          "42302810455550000046",
          "42302810455550000046"
        ]
      ]
    }
  ],
  "values": [
    {
      "name": "Документ.Тип документа",
      "type": "string",
      "typeColumns": null,
      "value": "Справка об остатке"
    },
    {
      "name": "disableConfirmation",
      "type": "string",
      "typeColumns": null,
      "value": "1"
    },
    {
      "name": "Язык справки",
      "type": "int",
      "typeColumns": null,
      "value": 0
    },
    {
      "name": "Документ.Доп. информация",
      "type": "string",
      "typeColumns": null,
      "value": "[Документ.Тип документа] [Документ.Источник списания]"
    },
    {
      "name": "Документ.Источник списания",
      "type": "string",
      "typeColumns": null,
      "value": "42302810455550000046"
    }
  ],
  "groupInput": "Параметры справки",
  "sidRequest": "CreateVerify",
  "nameForm": "Справка об остатке",
  "nameButton": null,
  "linkInfo": null,
  "linkContract": null,
  "descriptionForm": "Подтверждает наличие счетов/карт с указанием баланса на момент формирования справки",
  "pathImage": "/Documents/UBS_REQUEST_INFO.png"
};

export const createVerifyRes = {
  "codeResult": 0,
  "textResult": "",
  "values": [
  {
    "name": "Признак обработки",
    "type": "boolean",
    "typeColumns": null
  },
  {
    "name": "Состояние",
    "type": "int",
    "typeColumns": null,
    "value": 111
  },
  {
    "name": "Отделение",
    "type": "string",
    "typeColumns": null,
    "value": "ООО ЮБС-БАНК ОСН.УСТ.НАИМ.Филиала для плат док."
  },
  {
    "name": "БИК банка",
    "type": "string",
    "typeColumns": null,
    "value": "044525600"
  },
  {
    "name": "Дата обработки",
    "type": "string",
    "typeColumns": null,
    "value": "21.12.2021 21:17:12"
  },
  {
    "name": "Корр.счет банка",
    "type": "string",
    "typeColumns": null,
    "value": "30101810300000000600"
  },
  {
    "name": "Комментарий",
    "type": "string",
    "typeColumns": null,
    "value": ""
  },
  {
    "name": "Плательщик.Счет",
    "type": "string",
    "typeColumns": null,
    "value": "42302810155550000032"
  },
  {
    "name": "Остаток счета плательщика после операции",
    "type": "decimal",
    "typeColumns": null,
    "value": "1071.6300"
  }
],
  "groupInput": null,
  "sidRequest": "",
  "nameForm": null,
  "nameButton": null,
  "linkInfo": null,
  "linkContract": null,
  "descriptionForm": null,
  "pathImage": null
}
