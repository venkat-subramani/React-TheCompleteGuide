export const BookFields = [{
    field: 'title',
    label: 'Title',
    type: 'text',
    helperText: "Enter the Title of the book",
    width: '100%',
    autofocus: true,
    required: true
},{
    field: 'description',
    label: 'Description',
    type: 'text',
    multiline: true,
    rows: "3",
    helperText: "Enter the description",
    width: '100%',
    required: true
},{
    field: 'imageUrl',
    label: 'ImageUrl',
    type: 'text',
    helperText: "Please enter the imageUrl, image file is not accepted",
    width: '47%',
    required: true
},{
    field: 'authors',
    label: 'Authors',
    type: 'text',
    helperText: "Enter Author names, use comma to seperate multiple authors",
    width: '47%',
    required: true
},{
    field: 'categories',
    label: 'Categories',
    type: 'text',
    helperText: "Enter Genre/Category",
    width: '47%',
    required: true
},{
    field: 'isbn',
    label: 'Isbn',
    type: 'number',
    helperText: "Enter the ISBN number of the book",
    width: '47%'
},{
    field: 'averageRating',
    label: 'Average Rating',
    type: 'number',
    helperText: "Enter the average Rating",
    width: '23%',
    required: true
},{
    field: 'ratingsCount',
    label: 'Ratings Count',
    type: 'number',
    helperText: "Enter the total Rating given",
    width: '22%',
    required: true
},{
    field: 'totalCopies',
    label: 'Total Copies',
    type: 'number',
    helperText: "Total number of copies",
    width: '22%',
    required: true
},{
    field: 'availableCopies',
    label: 'Available Copies',
    type: 'number',
    helperText: "Available number of copies",
    width: '22%',
    required: true
}];