export default [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    sorter: (a, b) => a.name - b.name,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
    sorter: (a, b) => a.age - b.age,
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 100,
    sorter: (a, b) => a.address - b.address,
}, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    sorter: (a, b) => a.tags - b.tags,
}]