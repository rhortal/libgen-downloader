import React from "react";
import { Box } from "ink";
import ContentContainer from "../../components/ContentContainer";
import { useAppContext } from "../../contexts/AppContext";
import DetailRow from "./DetailRow";
import DetailEntryOptions from "./DetailEntryOptions";
import UsageInfo from "../../components/UsageInfo";

const Detail: React.FC = () => {
  const { detailedEntry } = useAppContext();

  if (!detailedEntry) {
    return null;
  }

  return (
    <Box flexDirection="column">
      <ContentContainer>
        {Object.entries(detailedEntry)
          .filter(([key]) => key !== "downloadUrls")
          .map(([key, value], idx) => (
            <DetailRow
              key={idx}
              label={key === "id" ? key.toUpperCase() : `${key[0].toUpperCase()}${key.slice(1)}`}
              description={value}
            />
          ))}
        <DetailEntryOptions />
      </ContentContainer>
      <UsageInfo />
    </Box>
  );
};

export default Detail;
