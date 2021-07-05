import { gql, useQuery } from '@apollo/client';
import * as React from "react";
import { TreeView, TreeViewItem } from '../TreeView';
import { useSectionContext } from "../../contexts/SectionContext";

const TABLE_OF_CONTENTS = gql`
  query GetTOC {
    toc {
      id
      parentId
      title
      ordering
    }
  }
`;

export function Sidebar() {
    const [tree, setTree] = React.useState();
    const { contentId, setContentId } = useSectionContext();

    const { loading, error } = useQuery(TABLE_OF_CONTENTS, {
        onCompleted: (data) => data ? setTree(generateTree(data.toc)) : setTree(null)
    });

    return <div style={{
        background: "#DDD",
        gridArea: "sidebar",
        paddingTop: "25px"
    }}>
        {loading ? <p>Loading...</p> :
            error || !tree ? <p>Error</p> :
                <TreeView
                    onNodeSelect={setContentId}
                    selected={contentId ?? null}
                >
                    {tree.sort((a, b) => Number(a.ordering) - Number(b.ordering)).map((node) => <TreeViewItem key={node.id} node={node} />)}
                </TreeView>}
    </div>

}

function generateTree(data) {
    // This relies on mutation from implied, which is the reason for the copy before creation
    const root = [];
    const nodeMap = new Map();

    data.forEach((value) => {
        const treeValue = { ...value, children: [] };
        if (!value.parentId) {
            root.push(treeValue);
        } else {
            const parent = nodeMap.get(value.parentId);
            if (parent) {
                parent.children.push(treeValue);
            } else {
                root.push(treeValue);
            }
        }
        nodeMap.set(treeValue.id, treeValue);
    });
    return root;
}
