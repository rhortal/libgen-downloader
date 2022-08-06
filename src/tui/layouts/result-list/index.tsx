import React, { useCallback, useState } from "react";
import { Box, useInput, Key, useFocus } from "ink";
import { useListItems } from "../../hooks/useListItems";
import { RESULT_LIST_ACTIVE_LIST_INDEX } from "../../../constants";
import ResultListItemOption from "./ResultListItemOption";
import ResultListItemEntry from "./ResultListItemEntry";
import { ResultListItemType } from "../../../api/models/ListItem";

const ResultList: React.FC = () => {
  const { listItems, setListItems, renderedItems } = useListItems();

  const { isFocused } = useFocus({ autoFocus: true });

  const [isEntryExpanded, setIsEntryExpanded] = useState(false);

  useInput(
    (input: string, key: Key) => {
      if (input.toLowerCase() === "j" || key.downArrow) {
        setListItems([...listItems.slice(1, listItems.length), listItems[0]]);
        return;
      }

      if (input.toLowerCase() === "k" || key.upArrow) {
        setListItems([
          listItems[listItems.length - 1],
          ...listItems.slice(0, listItems.length - 1),
        ]);
        return;
      }
    },
    {
      isActive: isFocused && !isEntryExpanded,
    }
  );

  const handleEntryExpand = useCallback((state: boolean) => {
    setIsEntryExpanded(state);
  }, []);

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor="grey"
      width="100%"
      paddingLeft={1}
      paddingRight={1}
    >
      {renderedItems.map((item, index) =>
        item.type === ResultListItemType.Option ? (
          <ResultListItemOption
            key={item.data.id}
            item={item}
            isActive={index === RESULT_LIST_ACTIVE_LIST_INDEX}
            isFadedOut={isEntryExpanded}
          />
        ) : (
          <ResultListItemEntry
            key={item.data.id}
            item={item}
            isActive={index === RESULT_LIST_ACTIVE_LIST_INDEX}
            isExpanded={index === RESULT_LIST_ACTIVE_LIST_INDEX && isEntryExpanded}
            isFadedOut={index !== RESULT_LIST_ACTIVE_LIST_INDEX && isEntryExpanded}
            setExpand={handleEntryExpand}
          />
        )
      )}
    </Box>
  );
};

export default ResultList;
