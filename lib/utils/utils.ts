/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Montserrat, Poppins, Roboto } from "next/font/google";
import { Id, toast } from "react-toastify";
import handleError from "../handleResponse/handleError";
import getToastError from "../handleResponse/getToastError";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700"]
})

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700"]
})

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700"]
})


export function getNow(): Date {
  return new Date(Date.now() - new Date().getTimezoneOffset() * 60 * 1000)
}

export function isValidToken(expiration: string) {
  const expirationDate = new Date(expiration);
  const now = new Date();

  return expirationDate > now;
}

export async function verifyAuth() {
  const token = localStorage.getItem("token")
  const expiration = localStorage.getItem("expiration")

  if (!token || !expiration) {
    return false
  }

  return isValidToken(expiration)

}

// export function getToastError(msg: string): UpdateOptions {
//   return {
//     render: msg,
//     type: "error",
//     isLoading: false,
//     autoClose: 5000,
//     closeButton: true,
//   };
// }

// export function getToastSuccess(msg: string): UpdateOptions {
//   return {
//     render: msg.toString(),
//     type: "success",
//     isLoading: false,
//     autoClose: 5000,
//     closeButton: true,
//   };
// }

// export function handleError(error: string, throws?: boolean) {
//   toast.error(error);

//   if (throws) {
//     throw new Error(error);
//   }
// }

function handleException(err?: string, toastify?: Id | null, throws?: boolean) {
  if (!err) {
    err = "Erro desconhecido ao realizar operação.";
  }

  if (toastify) {
    if (throws) {
      toast.update(toastify, getToastError(err));

      throw new Error(err);
    }

    toast.update(toastify, getToastError(err));
  } else {
    if (throws) {
      throw new Error(err);
    }
  }
}

// export function handleToastifyError(toastify: any, error: string, throws?: boolean) {
//   toast.update(toastify, getToastError(error));

//   if (throws) {
//     throw new Error(error);
//   }
// }

export async function handleResponseError(res: Response, toastify?: Id | null, throws?: boolean) {

  if (res.status == 403) {
    const error = "Erro ao se comunicar com os serviços Easy.";

    if (throws) {
      throw new Error(error);
    }
  }

  return res.json().then(err => {
    let error = err.userMessage ? err.userMessage : err.detail;
    error = error ? error : "Erro desconhecido ao realizar operação.";

    handleException(error, toastify, throws);
  });
}

export function resolveRequestError(err: any, toastify?: any) {
  if (err instanceof TypeError && err.message == "Failed to fetch") {
    const error = "Serviços EasyPost indisponíveis!";
    handleError(error);
  } else {
    const error = err.message ?? "Erro desconhecido ao realizar operação.";
    handleError(error);
  }
}

export function validateEmail(email: string): boolean {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return res.test(String(email).toLowerCase());
}

export function formatDate(date: string) {
  const dateToDateFormat = new Date(date)
  return dateToDateFormat.toLocaleDateString("pt-br")
}

export function getImageUrl(imgPath: string) {
  const formatUrl = imgPath.replace("var/www/", "");

  return "https://www.easypostsys.com.br".concat(formatUrl);
}

export function onlyNumbers(val: string): string {
  return val.replace(/\D/g, "");
}

export function maskDocument(document: string) {
  if (onlyNumbers(document).length > 11) {
    document = document.replace(/\D/g, "");
    document = document.replace(/(\d{2})(\d)/, "$1.$2");
    document = document.replace(/(\d{3})(\d)/, "$1.$2");
    document = document.replace(/(\d{3})(\d)/, "$1/$2");
    document = document.replace(/(\d{4})(\d)/, "$1-$2");

    return document;
  }

  document = document.replace(/\D/g, "");
  document = document.replace(/(\d{3})(\d)/, "$1.$2");
  document = document.replace(/(\d{3})(\d)/, "$1.$2");
  document = document.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return document;
}

export function formatCurrency(value: string | number) {
  if (!value) return "R$ 0,00";

  const numericValue = String(value).replace(/\D/g, "");

  const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

export function unformatCurrency(value: string) {
  // Remove todos os caracteres que não são dígitos ou ponto
  const numericValue = value.replace(/[^\d.-]/g, "");
  // Converte para número e divide por 100 para obter o valor correto
  return parseFloat(numericValue) / 100;
}