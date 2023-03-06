import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import ShowPage from 'pages/Show';
import PageContainer from 'components/PageContainer';

const Show = () => (
    <PageAccessValidator>
        <PageContainer>
            <ShowPage />
        </PageContainer>
    </PageAccessValidator>
);

export default Show;
