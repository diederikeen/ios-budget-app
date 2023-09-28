import { StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import React from 'react';
import axios from 'axios';
import { theme } from "../../theme";
import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";
import { useQuery } from "@tanstack/react-query";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Overview } from "./components/Overview/Overview";
import { TextComponent } from "../../components/TextComponent/TextComponent";
import { SheetManager } from "react-native-actions-sheet";
import { AddTransactionFeature } from "../../features/AddTransaction/AddTransaction";
import { transactionSchema } from "../../utils/schemas";
import { API_URL } from '@env';


async function fetchTransactions() {
  const res = await axios.get(`${API_URL}/transactions`);
    
  console.log({res});

  try {
    return transactionSchema.parse(res.data)
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }

}

export function HomeScreen(props) {
  console.log(`${API_URL}/transactions`);
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => await fetchTransactions(),
  });

  return (
    <DefaultLayout 
      hasHeader={true} 
      headerOptions={{
        title:props.route.name,
      }}
    >

      {!isLoading && data?.length > 0  ? (
        <Overview data={data} />
      ) : <TextComponent content="Something went wrong"/>}

      <FlexContainer style={styles.container}>
        <Button 
          title={
            <TextComponent 
              content="Add transactions"
              style={{fontSize: 14 }} 
              fontWeight="600" 
            />
          }
          type="clear"
          style={styles.floatingButton}
          onPress={() => SheetManager.show('AddTransactionSheet', {
            payload: {
              children: <AddTransactionFeature /> 
            }
          })}
        />
      </FlexContainer>
    </DefaultLayout>
  )
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: theme.colors.button.primary.background,
    height: 42,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
    height: 120,
  },
});
