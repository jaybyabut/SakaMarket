
type itemCardProps = {
    item: {
        id: number,
        image?: string;
        date: number;
        name: string;
        price: number;
        amount: number;
        description: string;
        title: string;
    };
};

export default function removeConfirmation(item: itemCardProps["item"]) {
  return(
    console.log('remove item', item.price)
    // add the remove item from database logic
  )
}
