import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Card,
  CardBody,
  CardTitle,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Page,
  PageFooter,
  PageHeader,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { UniversalHeader } from "./components/UniversalHeader";
import { SiteFooter } from "./components/SiteFooter";
import { UniversalFooter } from "./components/UniversalFooter";

const drawerConfig = {
  panelDefaultSize: "65%",
  panelMinWidth: "32ch",
};

const CARDS = [
  { id: "alpha", title: "Card Alpha", body: "Placeholder content." },
  { id: "beta", title: "Card Beta", body: "More placeholder content." },
  { id: "gamma", title: "Card Gamma", body: "Even more placeholder content." },
  { id: "delta", title: "Card Delta", body: "Supplemental details." },
  { id: "epsilon", title: "Card Epsilon", body: "Sample card content." },
  { id: "zeta", title: "Card Zeta", body: "Demo card for layout testing." },
  { id: "eta", title: "Card Eta", body: "Extra card in the grid." },
  { id: "theta", title: "Card Theta", body: "Additional placeholder content." },
  { id: "iota", title: "Card Iota", body: "Grid density validation card." },
];

export function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const onCloseClick = () => {
    setIsExpanded(false);
  };

  const activeCard = CARDS.find((card) => card.id === activeId);

  const openDrawer = (id: string) => {
    setActiveId(id);
    setIsExpanded(true);
  };

  const closeDrawer = () => {
    setIsExpanded(false);
    setActiveId(null);
  };

  const panelContent = (
    <DrawerPanelContent defaultSize={drawerConfig.panelDefaultSize} isResizable>
      <DrawerHead>
        <Title headingLevel="h3">{activeCard?.title ?? "Details"}</Title>
        <DrawerActions>
          <DrawerCloseButton onClose={closeDrawer} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <p>{activeCard?.body ?? "Select a card."}</p>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <>
      <Page
        className="pf-m-animate-smoothly"
        isContentFilled
        isPlain
        masthead={<PageHeader><UniversalHeader /></PageHeader>}
        footer={<PageFooter><SiteFooter /><UniversalFooter /></PageFooter>}
      >
        <PageSection>
          <Title headingLevel="h1">Demo page</Title>
          <p>Click a card to open the drawer panel.</p>
          <div className="hb-demo-card-grid">
            {CARDS.map((card) => (
              <Card
                key={card.id}
                isSelectable
                isSelected={activeId === card.id}
              >
                <CardTitle>{card.title}</CardTitle>
                <CardBody>
                  <p>{card.body}</p>
                  <Button
                    variant="primary"
                    onClick={() => openDrawer(card.id)}
                  >
                    Open drawer
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </PageSection>
      </Page>
      {isExpanded && <Backdrop onClick={onCloseClick}></Backdrop>}
      <Drawer
        isExpanded={isExpanded}
        isPill
        isViewport
        style={
          {
            "--pf-v6-c-drawer__panel--m-resizable--MinWidth":
              drawerConfig.panelMinWidth,
          } as React.CSSProperties
        }
      >
        <DrawerContent panelContent={panelContent} />
      </Drawer>
    </>
  );
}
