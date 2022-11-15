import React, { useState } from 'react';
import { View } from 'react-native';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import ThemedText from '../../components/Themed/Text';
import Button from '../../components/Button';
import ChipRow from '../../components/ChipRow';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';

export default function ExportDocumentsScreen(props: IExportDocumentsScreenProps) {
  const [fileType, setFileType] = useState<TypeOfFile>('PDF');
  const [period, setPeriod] = useState<TypeOfPeriod>('Неделя');
  const [typeOperation, setTypeOperation] = useState<TypeOfDocument>('Все');
  const [status, setStatus] = useState<TypeOfStatus>('Все');

  const doExtract = () => {
    void props.extractDocuments(fileType, period, typeOperation, status);
  };

  return (
    <ThemedSafeAreaView modal style={{flex: 1}}>
      <ModalScreenHeader onClose={props.close} title="Параметры выгрузки" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <ThemedText heading2 marginL-8>
              Формат файла
          </ThemedText>

          <ChipRow
            values={['PDF', 'XLS']}
            value={fileType}
            onValueChange={setFileType}
          />

          <ThemedText heading2 marginL-8>
            Период
          </ThemedText>

          <ChipRow
            values={['Неделя', 'Месяц', 'Год', 'Все']}
            value={period}
            onValueChange={setPeriod}
          />

          <ThemedText heading2 marginL-8>
            Тип операции
          </ThemedText>

          <ChipRow
            values={['Все', 'Оплата', 'Возврат']}
            value={typeOperation}
            onValueChange={setTypeOperation}
          />

          <ThemedText heading2 marginL-8>
            Состояние
          </ThemedText>

          <ChipRow
            values={['Все', 'Завершена', 'В процессе', 'Отбракована']}
            value={status}
            onValueChange={setStatus}
          />

        </View>
        <View style={{paddingHorizontal: 16, marginVertical: 8}}>
          <Button label="Применить" filled  onPress={doExtract}/>
        </View>
      </View>
    </ThemedSafeAreaView>
  );
}
