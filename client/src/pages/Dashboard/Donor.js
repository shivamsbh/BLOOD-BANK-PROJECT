import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Donor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Find donor records
  const getDonors = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/inventory/get-donors");
      
      if (data?.success) {
        setData(data?.donors || []);
      } else {
        toast.error("Failed to fetch donor records");
      }
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast.error("Error fetching donor records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <h4 className="mb-4">Donor Records</h4>
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data.map((record) => (
                    <tr key={record._id}>
                      <td>
                        {record.name || 
                         record.organisationName ? `${record.organisationName} (ORG)` : 
                         "N/A"}
                      </td>
                      <td>{record.email}</td>
                      <td>{record.phone}</td>
                      <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No donor records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Donor;
