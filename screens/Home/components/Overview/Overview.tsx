import { ListItem, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../../../theme';
import { Transactions } from '../../Home';
import { TextComponent } from '../../../../components/TextComponent/TextComponent';
import { FlexContainer } from '../../../../components/FlexContainer/FlexContainer';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function deleteTransaction(id: number) {
  try {
    const res = axios.delete(`${process.env.API_URL}/transactions/delete?transaction_id=${id}`);
    return res;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export function Overview ({data}: { data: Transactions}) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => deleteTransaction(id),
    onSuccess: () => queryClient.invalidateQueries(['transactions'])
  });

  return (
    <ScrollView style={styles.wrapper}>
      {data.sort((a,b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()).map((transaction) => (
        <ListItem.Swipeable
          onPress={() => alert('sada')} 
          key={transaction.id}
          containerStyle={{
            padding: 0,
            paddingHorizontal: theme.padding.container,
            paddingVertical: theme.padding[3],
            backgroundColor: theme.colors.background.secondary,
            borderBottomColor: `rgba(0, 0, 0, .1)`,
            borderBottomWidth: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          rightContent={(reset) => (
            <Button
              title="Delete"
              onPress={() => {
                deleteMutation.mutate(transaction.id);
                reset();
              }}
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={{ minHeight: '100%', backgroundColor: '#FA465B' }}
              containerStyle={{borderRadius: 0}}
            />
          )}
        >
          <ListItem.Content>
            <FlexContainer
              flexDirection="row"
              style={{
                alignItems: 'center',
                width: '100%',
              }}
            >
              <View style={{
                width: 32,
                height: 32, 
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.text.primary,
                marginRight: theme.padding[4],
              }}>
                <Icon 
                  name={transaction.category.icon_name} 
                  size={16}
                  color="#37306B" />
              </View>
              <TextComponent content={transaction.category.name} fontWeight="500" />
              <TextComponent content={`€${transaction.amount}`} fontWeight="600" style={{marginLeft: 'auto'}} />
            </FlexContainer>
          </ListItem.Content>
        </ListItem.Swipeable>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 26,
    marginHorizontal: theme.padding[3],
    borderRadius: 10,
    backgroundColor: '#fff',
    flex: 1,
    overflow: 'hidden'
  }
});
