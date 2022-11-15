import reducer, { setInitialDocument } from '../../src/redux/document/reducer';
import { IExecuteRes } from '../../src/redux/document/api';
import { documentSelector } from '../../src/redux/document/selectors';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: 'test', payload: null})).toEqual(
    {
      currentGroupIndex: 0,
      requestBound: [],
      groupInput: '',
      nameForm: '',
      nameButton: null,
      linkInfo: null,
      linkContract: null,
      descriptionForm: '',
      pathImage: '',
    }
  )
});

test('Обновить state после получения данных', () => {

  const returnData: IExecuteRes = {
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

  const reducerAfterRequest = reducer(undefined, setInitialDocument(returnData));
  expect(reducerAfterRequest.requestBound[0].groups.length).toEqual(1);
  expect(reducerAfterRequest.requestBound[0].sidRequest).toEqual('CreateVerify');

  const afterSelector = documentSelector({ document: reducerAfterRequest });
  expect(afterSelector.sidRequest).toEqual('CreateVerify');
  expect(afterSelector.groups.length).toEqual(1);

})

