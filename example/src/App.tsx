import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {
  DdSdk,
  DdSdkConfiguration,
  DdLogs,
  DdRum,
} from 'dd-sdk-reactnative';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    setResult('…');

    let config = new DdSdkConfiguration(
      '<CLIENT_TOKEN>',
      '<ENVIRONMENT>',
      '<APPLICATION_ID>'
    );

    DdSdk.initialize(config).then(() => {
      DdRum.startView('first', 'App', new Date().getTime(), {});

      DdLogs.info('This is a log sent from react-native', {
        foo: 42,
        bar: 'xyz',
      }).then(() => {
        setResult('Log sent!');
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button
        title="Click me"
        onPress={() => {
          DdRum.addAction('TAP', 'button1', new Date().getTime(), {});
          DdRum.startResource(
            '1',
            'GET',
            'http://www.example.com/api/v1/test',
            new Date().getTime(),
            {}
          );
          setResult('Clicked!');
          DdRum.stopResource('1', 200, 'xhr', new Date().getTime() + 200, {});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
