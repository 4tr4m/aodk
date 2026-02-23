import React from 'react';

const BlogAdminLogin = ({ login, onLoginChange, onSubmit, status }) => (
  <form
    onSubmit={onSubmit}
    className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
  >
    <p className="text-sm text-gray-600">
      Zaloguj się, aby dodać lub edytować artykuły na blogu.
    </p>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Użytkownik</label>
      <input
        type="text"
        name="username"
        value={login.username}
        onChange={onLoginChange}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
      <input
        type="password"
        name="password"
        value={login.password}
        onChange={onLoginChange}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
      />
    </div>
    {status?.type === 'error' && (
      <div className="p-3 rounded-lg bg-red-50 text-red-800 text-sm">{status.message}</div>
    )}
    <button
      type="submit"
      className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
    >
      Zaloguj
    </button>
  </form>
);

export default BlogAdminLogin;
