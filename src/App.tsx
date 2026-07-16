import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Page,
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
];

export function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

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
    <Drawer
      isExpanded={isExpanded}
      isPill
      style={
        {
          "--pf-v6-c-drawer__panel--m-resizable--MinWidth":
            drawerConfig.panelMinWidth,
        } as React.CSSProperties
      }
    >
      <DrawerContent panelContent={panelContent}>
        <DrawerContentBody className="hb-app-chrome">
          <UniversalHeader />
          <Page className="pf-m-animate-smoothly hb-v1-theme" isContentFilled>
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
          <SiteFooter />
          <UniversalFooter />
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
}
