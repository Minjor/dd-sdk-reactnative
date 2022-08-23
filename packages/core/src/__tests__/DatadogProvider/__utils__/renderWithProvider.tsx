import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import React from 'react';

import { DatadogProvider } from '../../../DatadogProvider';
import { DdSdkReactNativeConfiguration } from '../../../DdSdkReactNativeConfiguration';

const DefaultTestApp = () => {
    return (
        <View>
            <Text>I am a test application</Text>
        </View>
    );
};

const defaultConfiguration = new DdSdkReactNativeConfiguration(
    'fakeToken',
    'fakeEnv',
    'fakeApplicationId',
    true,
    true,
    true
);

export const renderWithProvider = (params?: {
    AppComponent?: React.ReactNode;
    configuration?: DdSdkReactNativeConfiguration;
}) => {
    const AppComponent = params?.AppComponent || <DefaultTestApp />;
    const configuration = params?.configuration || defaultConfiguration;

    return render(
        <DatadogProvider configuration={configuration}>
            {AppComponent}
        </DatadogProvider>
    );
};
