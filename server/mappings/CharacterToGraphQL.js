export function convertCharacterToGraphQLType(character) { 
    if (!character) {
        return undefined;
    }
    return {
        id: character.Character_Id,
        name: character.Name,
        notes: character.Description,
    };
}