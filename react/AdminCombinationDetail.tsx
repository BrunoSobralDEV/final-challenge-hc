import type { FC } from "react";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Layout, PageBlock, PageHeader } from "vtex.styleguide";

import "./styles.global.css";

const AdminCombinationDetail: FC<Props> = ({ params }) => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-combination.details" />}
        />
      }
    >
      <PageBlock variation="full">
        <div>
          Params: <pre>{JSON.stringify(params, null, 2)}</pre>
        </div>
      </PageBlock>
    </Layout>
  );
};

interface Props {
  params: any;
}

export default AdminCombinationDetail;
