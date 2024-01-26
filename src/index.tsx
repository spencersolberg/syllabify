import { ActionPanel, Action, Detail, LaunchProps } from "@raycast/api";
import { hyphenateSync } from "hyphen/en";

interface SyllabifyArguments {
  word: string;
}

export default function Command(props: LaunchProps<{ arguments: SyllabifyArguments }>) {
  const { word } = props.arguments;
  let syllabifiedWord: string = hyphenateSync(word, { hyphenChar: "-" });
  let syllableCount = syllabifiedWord.split("-").length;

  const data = `# \`${syllabifiedWord}\`

  ---

  \`${word}\`, ${syllableCount} syllable${syllableCount > 1 ? "s" : ""}`;
  return (
    <Detail markdown={data} actions={<ActionPanel>
      <Action.CopyToClipboard
        title="Copy syllabified word"
        content={syllabifiedWord}
      />
      <Action.CopyToClipboard
        title="Copy unsyllabified word"
        content={word}
      />
      <Action.CopyToClipboard
        title="Copy syllable count"
        content={syllableCount}
      />
    </ActionPanel>} />

  );
}
