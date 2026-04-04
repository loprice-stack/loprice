import { Tabs, TabsContentProps } from "tamagui"

export const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      bg="$background"
      key="tab3"
      p="$2"
      items="center"
      justify="center"
      flex={1}
      borderColor="$background"
      rounded="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}
    >
      {props.children}
    </Tabs.Content>
  )
}