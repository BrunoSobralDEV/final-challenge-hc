import type { FC } from "react";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Layout, PageBlock, PageHeader } from "vtex.styleguide";

import UsersTable from "./components/AdminCombination/index";

import "./styles.global.css";

const AdminCombination: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-combination.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
        <UsersTable />
      </PageBlock>
    </Layout>
  );
};

export default AdminCombination;
