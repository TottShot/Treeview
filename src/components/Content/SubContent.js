import * as React from 'react';

export function SubContent({ contentInfo }) {

    if (contentInfo.status === 'loading') {
        throw contentInfo.promise;
    }

    return (<div>
        <p>{contentInfo.data.content}</p>
    </div>)
}