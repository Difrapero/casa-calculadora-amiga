import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      setSubmitted(true);
      toast({ title: "¡Solicitud enviada!", description: "Nos pondremos en contacto contigo pronto." });
    } catch {
      toast({ title: "Error", description: "No se pudo enviar. Inténtalo de nuevo.", variant: "destructive" });
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 shadow-lg text-center bg-accent">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-foreground">¡Gracias!</h3>
        <p className="text-muted-foreground mt-2">Hemos recibido tu solicitud. Te contactaremos para ofrecerte el mejor estudio hipotecario.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-lg border-2 border-primary/20">
      <h3 className="text-xl font-bold text-center text-foreground mb-2">
        Te ayudamos a conseguir la mejor hipoteca
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-5">
        Solicita tu estudio hipotecario gratuito
      </p>

      <form name="leads-hipoteca" method="POST" data-netlify="true" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="leads-hipoteca" />

        <div className="space-y-3">
          <div>
            <Label>Nombre</Label>
            <Input type="text" name="nombre" required placeholder="Tu nombre completo" maxLength={100} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" required placeholder="tu@email.com" maxLength={255} />
          </div>
          <div>
            <Label>Teléfono</Label>
            <Input type="tel" name="telefono" required placeholder="600 000 000" maxLength={20} />
          </div>
          <Button type="submit" className="w-full text-lg py-6 mt-2">
            Quiero mi estudio hipotecario
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LeadForm;
