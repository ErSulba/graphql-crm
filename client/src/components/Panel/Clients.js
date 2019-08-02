import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTS } from 'queries';
import Spinner from 'components/widgets/Spinner';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

const Clients = () => {
  return (
    <>
      <Query query={TOP_CLIENTS}>
        {({ data, loading, error }) => {
          if (error) return error;
          if (loading) return <Spinner />;

          const newData = data.topClients.map(({ total, cliente }, index) => ({
            total,
            cliente: cliente[0].nombre
          }));

          return (
            <ResponsiveContainer width='100%' height={250}>
              <BarChart data={newData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='cliente' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='total' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          );
        }}
      </Query>
    </>
  );
};

export default Clients;
