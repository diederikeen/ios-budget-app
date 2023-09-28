import { View, Text, StyleSheet, Pressable } from "react-native";
import InputComponent from "../../components/InputComponent/InputComponent";
import { theme } from "../../theme";
import { useState } from "react";
import { FlexContainer } from "../../components/FlexContainer/FlexContainer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextComponent } from "../../components/TextComponent/TextComponent";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import { SheetManager } from "react-native-actions-sheet";

const categorySchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    icon_name: z.string(),
    priority: z.boolean(),
  })
)

async function fetchCategories() {
  const res = await axios.get(`${process.env.API_URL}/categories`);
  try {
    const data = categorySchema.parse(res.data);
    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

interface TransactionProps {
  amount: string;
  note: string;
  category: number;
}

async function createTransaction({amount, note, category}: TransactionProps) {
  try {
    const res = await axios.post(`${process.env.API_URL}/transactions/create`, {
      amount,
      note,
      category
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export function AddTransactionFeature() {
  const [amount, setAmount] = useState<string | null>(null);
  const [note, setNote] = useState<null | string>(null);
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
  const queryClient = useQueryClient()

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => fetchCategories(),
  });

  const submitTransaction = useMutation({
    mutationKey: ['create_transaction'],
    mutationFn: async () => await createTransaction({
      amount,
      note,
      category: selectedCategory,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
      SheetManager.hide('AddTransactionSheet')
    }
  });
 
  return (
      <View>
        <FlexContainer rowGap={theme.padding[5]}>
          <InputComponent onChangeText={(val) => setAmount(val)} value={amount} label="€ Amount" labelInset={true} inputMode="decimal" />
          <InputComponent onChangeText={(val) => setNote(val)}
            value={note}
            label="Note about transaction"
            inputMode="text" 
            multiLine 
          />

          <View>
            <TextComponent content="Category" style={{fontSize: 12, marginBottom: theme.padding[2]}} fontWeight="600" />
              <View>
              {!isLoading ? (
                <>
                  <View style={{paddingBottom: theme.padding[4]}}>
                    <Select 
                      onValueChange={(val:number) => setSelectedCategory(val)}
                      options={categories?.map(({id, name}) => ({
                        value: id,
                        label: name,
                      }))}
                    />
                  </View>
                  <TextComponent content="Or select quickly" style={{fontSize: 10, textAlign: 'center', textTransform: 'uppercase', marginBottom: theme.padding[4]}} fontWeight="600"/>
                  <FlexContainer flexDirection="row" gap={theme.padding[4]} style={{justifyContent: 'space-evenly', }}>
                    {categories?.filter((category) => category.priority).map((category) => {
                      const isSelected  = category.id === selectedCategory;
                      return (
                        <View style={[styles.tileWrap, { opacity: isSelected ? 1 : 0.7 }]} key={category.id}>
                          <Pressable style={[styles.tile, isSelected ? styles.selectedCategory : null]} key={category.id} onPress={() => setSelectedCategory(category.id)}>
                            <FlexContainer style={styles.tileContent}>
                              <Icon name={category.icon_name} size={18} color={isSelected ? '#fff' : '#D3D8ED'} />
                            </FlexContainer>
                          </Pressable>
                          <TextComponent 
                            content={category.name}
                            style={{
                              fontSize: 8,
                              textTransform: 'uppercase', 
                              marginTop: theme.padding[3], 
                              color: isSelected ? '#fff' : '#D3D8ED'
                            }} 
                            fontWeight="600"
                          />
                        </View>
                      )
                    })}
                  </FlexContainer>
                  </>
                ) : null }
            </View>
          </View> 
          <Button 
            style={{marginTop: theme.padding[5]}}
            onPress={() => submitTransaction.mutate()}>
              <Text>Submit</Text>
          </Button>
        </FlexContainer>
      </View>
  )
}

const styles = StyleSheet.create({
  tileWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tile: {
    backgroundColor: '#9E4784',
    borderWidth: 2,
    borderColor: '#D3D8ED',
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  tileContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategory: {
  }
});
