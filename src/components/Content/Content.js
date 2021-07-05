import { gql, useApolloClient } from '@apollo/client';
import * as React from 'react';
import { SubContent } from './SubContent';
import { useSectionContext } from '../../contexts/SectionContext';

const CONTENT = gql`
  query GetContents($id: ID!) {
    content(id: $id) {
        id
        title
        content
    }
  }
`;

export function Content() {
    const client = useApolloClient();
    const { contentId } = useSectionContext();
    const [contentInfo, setContentInfo] = React.useState({
        data: null,
        status: 'pending',
        promise: undefined,
    });

    React.useLayoutEffect(() => {
        const abortController = new AbortController();
        if (contentId) {
            const promise = client.query({
                query: CONTENT,
                variables: { id: contentId },
                context: { fetchOptions: { signal: abortController.signal } }
            }).then(
                (result) => setContentInfo({
                    data: result.data.content,
                    status: 'resolved',
                    promise: null,
                }),
                (error) => setContentInfo({
                    data: null,
                    error,
                    status: 'rejected',
                    promise: null
                }));
            setContentInfo({
                data: null,
                status: 'loading',
                promise,
            });
        }
        return () => abortController.abort();
    }, [contentId, client]);

    if (contentInfo.status === 'pending') {
        return <div><p>Select a component to start</p></div>
    } else if (contentInfo.status === 'rejected') {
        return <div><p>An error occured with loading</p></div>
    }

    return (<div>
        <h2>{contentInfo.data?.title}</h2>
        <React.Suspense fallback={<p>Loading...</p>}>
            <SubContent contentInfo={contentInfo} />
        </React.Suspense>
    </div>)
}