const products = [
    {
      id: 1,
      name: 'Product 1',
      available_quantity: 5,
      price: 450,
      imgUrl:"https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description: 'Lorem ipsum dolor sit amet, iusto appellantur vix te, nam affert feugait menandri eu. Magna simul ad est. Nostrum neglegentur ius at, at pertinax repudiare vel. Vim an adolescens quaerendum.'
    },
  
    {
      id: 2,
      name: 'Product 2',
      available_quantity: 7,
      price: 50,
      description: 'Lorem ipsum dolor sit amet, iusto appellantur vix te, nam affert feugait menandri eu. Magna simul ad est. Nostrum neglegentur ius at, at pertinax repudiare vel. Vim an adolescens quaerendum.'
    },
  
    {
      id: 3,
      name: 'Product 3',
      available_quantity: 0,
      price: 500,
      description: 'Lorem ipsum dolor sit amet, iusto appellantur vix te, nam affert feugait menandri eu. Magna simul ad est. Nostrum neglegentur ius at, at pertinax repudiare vel. Vim an adolescens quaerendum.'
    },
  
    {
      id: 4,
      name: 'Product 4',
      available_quantity: 4,
      price: 1500,
      description: 'Lorem ipsum dolor sit amet, iusto appellantur vix te, nam affert feugait menandri eu. Magna simul ad est. Nostrum neglegentur ius at, at pertinax repudiare vel. Vim an adolescens quaerendum.'
    },
  ];
  
  
  
  const users = [
      {
        'name': 'richard@connectedh.com',
        'password': 'richard@123',
        'id': 1
        
      },
      {
        'name': 'joe@connectedh.com',
        'password': 'joe@123',
        'id': 2
        
      }
  ];
  
  module.exports = { 'products': products, users: users }