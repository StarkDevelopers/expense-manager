const fetchMessage = (feature) => `Failed to fetch ${feature}`;

const createMessage = (feature, fail) => !fail ?
        `${feature} has been created successfully` :
        `Failed to create ${feature}`;
    
const updateMessage = (feature, fail) => !fail ?
        `${feature} has been updated successfully` :
        `Failed to update ${feature}`;

const deleteMessage = (feature, fail) => !fail ?
        `${feature} has been deleted successfully` :
        `Failed to delete ${feature}`;

module.exports = {
    fetchMessage,
    createMessage,
    updateMessage,
    deleteMessage
};
