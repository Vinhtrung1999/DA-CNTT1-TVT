const { connection } = require('../../../db')

let getReport = async (req, res) => {
  try {
    let pool = await connection()
    let dataReport = await pool.request().execute('getReport')
    dataReport = dataReport.recordset

    let dataCplBill = await pool.request().execute('getCompletedBills')
    dataCplBill = dataCplBill.recordset
    //Revenue
    let totalRevenue = 0
    dataCplBill.forEach(val => {
      totalRevenue += val.total
    });

    //Cost
    let dataInputBill = await pool.request().execute('getInputBill')
    dataInputBill = dataInputBill.recordset

    let dataSalaryStaff = await pool.request().execute('getAllStaffs')
    dataSalaryStaff = dataSalaryStaff.recordset

    let totalCost = 0
    dataInputBill.forEach(val => {
      totalCost += (val.qty * val.inputPrice)
    })

    dataSalaryStaff.forEach(val => {
      totalCost += val.salary
    })
    return res.json({ code: 0, data: { totalRevenue, totalCost, dataReport } })
  } catch (err) {
    return res.json({ code: 1, message: 'Server error' })
  }
}

module.exports = {
  getReport
}