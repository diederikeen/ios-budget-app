import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-elements';
import React from 'react';
import axios from 'axios';
import { theme } from "../../theme";
import { DefaultLayout } from "../../layouts/DefaultLayout/DefaultLayout";
import { useQuery } from "@tanstack/react-query";
import z from 'zod';
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { Overview } from "./components/Overview/Overview";
import { TextComponent } from "../../components/TextComponent/TextComponent";
import { SheetManager } from "react-native-actions-sheet";
import { AddTransactionScreen } from "../AddTransaction/AddTransaction";
import { AddTransactionFeature } from "../../features/AddTransaction/AddTransaction";

const transactionSchema = z.array(
  z.object({
    id: z.number(),
    amount: z.number(),
    note: z.string().optional(),
    created_at: z.string(),
    category: z.object({
      name: z.string(),
      id: z.number(),
      icon_name: z.string(),
    })
  })
)

export type Transactions = z.infer<typeof transactionSchema>

async function fetchTransactions() {
  const res = await axios.get(`${process.env.API_URL}/transactions`);

  try {
    return transactionSchema.parse(res.data)
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }

}

export function HomeScreen(props) {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
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
      ) : null}

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
