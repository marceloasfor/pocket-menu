// for client side

// export async function verifyCode(table:string, code:string) {
//     const res = await fetch('http://localhost:3000/api/verification', {
//         method: 'POST',
//         body: JSON.stringify({ table: table, code: code }),
//       })
//     const result = await res.json()
//     return result.res
// }

export async function anonLogin(username:string, code:string|null) {
  const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, verification_code: code }),
    })
  const result = await res.json()
  return result.res
}

// export async function anonLogout(token:string|null) {
//   const res = await fetch('http://localhost:3000/api/logout', {
//       method: 'POST',
//       body: JSON.stringify({ token: token }),
//     })
//   const result = await res.json()
//   return result.res
// }

export async function getAllUsers(verification_code:string|null) {
  const res = await fetch('http://localhost:3000/api/user', {
      method: 'GET',
      body: JSON.stringify({ verification_code: verification_code }),
    })
  const result = await res.json()
  return result.res
}

export async function getAllOrders(verification_code:string|null) {
  const res = await fetch('http://localhost:3000/api/order', {
      method: 'GET',
      body: JSON.stringify({ verification_code: verification_code }),
    })
  const result = await res.json()
  return result.res
}

export async function getAllMenuItems(restaurant:string|null) {
  const res = await fetch('http://localhost:3000/api/menu', {
      method: 'GET',
      body: JSON.stringify({ restaurant: restaurant }),
    })
  const result = await res.json()
  return result.res
}

export async function addOrder(verification_code:string|null) {
  const res = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      body: JSON.stringify({ verification_code: verification_code }),
    })
  const result = await res.json()
  return result.res
}