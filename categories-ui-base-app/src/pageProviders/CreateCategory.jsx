import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import CreatePage from 'pages/Create';
import PageContainer from 'components/PageContainer';

const CreateCategory = () => (
    <PageAccessValidator>
        <PageContainer>
            <CreatePage/>
        </PageContainer>
    </PageAccessValidator>
);

export default CreateCategory;