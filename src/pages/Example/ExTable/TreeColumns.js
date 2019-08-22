export default [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.age - b.age,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
    sorter: (a, b) => a.age - b.age,
}, {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
    sorter: (a, b) => a.age - b.age,
}]