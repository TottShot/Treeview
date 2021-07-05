import * as React from "react";
import { useTreeViewContext } from "./TreeViewContext";

function MinusSquare(props) {
    return (
        <svg fontSize="inherit" style={{ width: 14, height: 14 }} viewBox="-2 -2 28 28" {...props}>
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </svg>
    );
}

function PlusSquare(props) {
    return (
        <svg fontSize="inherit" style={{ width: 14, height: 14 }} viewBox="-2 -2 28 28" {...props}>
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </svg>
    );
}

export function TreeViewItem({ node }) {
    const { expanded, controlExpanded, selected, onNodeSelect } = useTreeViewContext();
    const isExpanded = expanded.has(node.id);

    if (Array.isArray(node.children) && node.children.length) {
        return <div
            style={{ padding: "0 9px" }}
            key={node.id}>
            <i onClick={() => controlExpanded(node.id)}>{isExpanded ? <MinusSquare /> : <PlusSquare />}</i>
            <span
                onClick={() => onNodeSelect(node.id)}
                style={{ backgroundColor: selected === node.id ? "#aa73f3" : "inherit", paddingLeft: "6px", width: "90%" }}>
                <p style={{ display: "inline-block", margin: "0" }}>{node.title}</p>
            </span>
            <div style={{ paddingLeft: "16px" }}>
                {isExpanded ?
                    node.children.map((childNode) => <TreeViewItem key={childNode.id} node={childNode} />) :
                    null}
            </div>
        </div>
    }

    return <div
        key={node.id}
        onClick={() => onNodeSelect(node.id)}
        style={{ backgroundColor: selected === node.id ? "#aa73f3" : "inherit", margin: "0", padding: "0 9px", width: "90%" }}>
        <p style={{ margin: "4px" }}>{node.title}</p>
    </div>
}