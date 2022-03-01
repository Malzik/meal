import { useCallback } from "react";

export function useSend(setItems, date) {
    return useCallback(({ key, fromId, toId }) => {
        date = date.format("DD/MM/YYYY")
        // The id of the MuuriComponent that is sending the item.
        fromId = fromId.toLowerCase();
        // The id of the MuuriComponent that is receiving the item.
        toId = toId.toLowerCase();

        // Sync the state with the items.
        setItems(items => {
            let newItems = { ...items };
            const from = fromId === "ingredients" ? newItems[fromId] : newItems[date][fromId]
            const to = toId === "ingredients" ? newItems[toId] : newItems[date][toId]

            const itemToMove = from.filter(item => item.id === parseInt(key))

            // Add the item in the new category.
            if (toId !== "ingredients") {
                newItems[date][toId] = to.concat(itemToMove)
            }
            return newItems;
        });
    }, [date, setItems]);
}

// Column static options.
export const columnOptions = {
    groupIds: ["testdragable"],
    dragHandle: ".testdragable",
    dragSort: { groupId: "testdragable" },
    dragEnabled: true,
    dragContainer: document.body,
    dragSortPredicate: {action: "move"},
};
