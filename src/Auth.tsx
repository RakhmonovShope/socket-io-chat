import React, { useState } from "react";
import styles from "./App.module.scss"; // Import Sass module styles
import http from "./http";

interface IProps {
  // onSubmit: (formData: { phone: string; password: string }) => void;
}

const Auth: React.FC<IProps> = () => {
  const [formData, setFormData] = useState({ phone: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    http.post("/auth/signin", formData).then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);

      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  };

  return (
    <section className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Sign In</h2>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className={styles.authButton}>
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
