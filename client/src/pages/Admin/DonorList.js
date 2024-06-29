import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const DonorList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Find donor records
  const getDonors = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/admin/donor-list");
      
      if (data?.success) {
        setData(data?.donorData || []);
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

  // DELETE FUNCTION with better UX
  const handleDelete = async (id, donorName) => {
    try {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete ${donorName}? This action cannot be undone.`
      );
      
      if (!isConfirmed) return;

      setDeleteLoading(id);
      const { data } = await API.delete(`/admin/delete-user/${id}`);
      
      if (data?.success) {
        toast.success(data?.message || "Donor deleted successfully");
        // Remove the deleted item from state instead of reloading
        setData(prevData => prevData.filter(item => item._id !== id));
      } else {
        toast.error(data?.message || "Failed to delete donor");
      }
    } catch (error) {
      console.error("Error deleting donor:", error);
      toast.error("Error deleting donor");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Donor Management</h4>
          <button 
            className="btn btn-primary"
            onClick={getDonors}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
        
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
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data.map((record) => {
                    const displayName = record.name || 
                      (record.organisationName ? `${record.organisationName} (ORG)` : "N/A");
                    
                    return (
                      <tr key={record._id}>
                        <td>{displayName}</td>
                        <td>{record.email}</td>
                        <td>{record.phone}</td>
                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(record._id, displayName)}
                            disabled={deleteLoading === record._id}
                          >
                            {deleteLoading === record._id ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <i className="fa fa-trash me-1"></i>
                                Delete
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
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

export default DonorList;
