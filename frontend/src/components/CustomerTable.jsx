function CustomerTable({
  data
}){

  return(

    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-5
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-4
        "
      >
        Customers
      </h2>

      <table
        className="
        w-full
        "
      >

        <thead>

          <tr>

            <th>
              Customer
            </th>

            <th>
              Revenue
            </th>

          </tr>

        </thead>

        <tbody>

          {

            data.map(
              (customer,index)=>(
                <tr
                  key={index}
                >

                  <td>
                    {
                      customer.customer_name
                    }
                  </td>

                  <td>
                    ₹{
                      Math.round(
                        customer.revenue
                      )
                    }
                  </td>

                </tr>
              )
            )

          }

        </tbody>

      </table>

    </div>

  );
}

export default CustomerTable;