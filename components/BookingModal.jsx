'use client';
import { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";

export default function BookingModal() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "auto",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', width: '100%' }}>
      <h3 style={{ marginBottom: '16px', fontSize: 'var(--text-lg)', textAlign: 'center' }}>Book a Call with Me</h3>
      <Cal 
        calLink="amr-samir-edris" 
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: 'month_view', theme: 'auto' }}
      />
    </div>
  );
}
