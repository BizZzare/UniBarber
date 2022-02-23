import processRequest from './ApiRequest'


export const getBranches = () =>
    processRequest(`/branches`);

export const getCustomers = () =>
    processRequest(`/customers`);

export const getService = () =>
    processRequest(`/service`);

export const getStatistics = (branchId) => 
    processRequest(`/${branchId}/visits/statistics`);



export const addCustomer = async (customer) => {
    return await processRequest('/customers', 'POST', customer)
}

export const addService= async (service) => {
    return await processRequest('/service', 'POST', service)
}

export const addVisit = async (visit) => {
    return await processRequest('/visits', 'POST', visit)
}



export const updateCustomer = async (customer) => {
    return await processRequest('/customers', 'PUT', customer)
}

export const updateService = async (service) => {
    return await processRequest('/service', 'PUT', service)
}

export const updateVisit = async (visit) => {
    return await processRequest('/visits', 'PUT', visit)
}


export const deleteCustomer = async (customerId) => {
    return await processRequest(`/customers?customerId=${customerId}`, 'DELETE')
}

export const deleteService = async (serviceId) => {
    return await processRequest(`/service?serviceId=${serviceId}`, 'DELETE')
}