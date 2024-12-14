import { Text } from 'react-native';

const highlightSubtext = (text: string, subtext: string) => {
  const index = text.toLowerCase().indexOf(subtext.toLowerCase());

  if (index === -1) return null;

  const before = text.slice(0, index);
  const match = text.slice(index, index + subtext.length);
  const after = text.slice(index + subtext.length);

  return (
    <Text>
      {before}
      <Text style={{ color: "#2aaaff" }}>{match}</Text>
      {after}
    </Text>
  );
}; 

export { highlightSubtext };